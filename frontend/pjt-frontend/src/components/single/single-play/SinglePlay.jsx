import React, { useEffect, useState } from 'react';
import S from './styled';
import { FaRegCommentDots } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { PiMouseRightClick, PiMouseLeftClick } from 'react-icons/pi';
import { TypeAnimation } from 'react-type-animation';
import { useParams, useNavigate } from 'react-router-dom';
import SingleBanner from './SingleBanner.jsx';
import SoundStore from '../../../stores/SoundStore.jsx';
import SingleSoundStore from '../../../stores/SingleSoundStore.jsx';
import ChatModal from './chat-modal/ChatModal.jsx';
import axios from 'axios';
import store from '../../../store/store';
import Loading from '../../loading/Loading.jsx';
import ReactModal from 'react-modal';
import SingleInfoStore from '../../../stores/SingleInfoStore.jsx';
const testDialogueList = [
  {
    page_no: 0,
    script_content: '첫번째 줄 \n 두번째 줄 \n 세번째 줄',
    action: 0,
    imageCount: 0,
  },
  {
    page_no: 1,
    script_content: '두번째 페이지 줄 \n 두번째 줄 \n 세번째 줄',
    action: 1,
    imageCount: 1,
  },
  {
    page_no: 3,
    script_content: '세번째 페이지 줄 \n 두번째 줄 \n 세번째 줄',
    action: 2,
    imageCount: 2,
  },
  {
    page_no: 4,
    script_content: '네번째 페이지 \n 두번째 줄 \n 세번째 줄',
    action: 3,
    imageCount: 1,
  },
];

export default function SinglePlay() {
  const [page, setPage] = useState(0);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content_id } = useParams();
  const navigate = useNavigate();
  const [dialogueList, setDialogueList] = useState(testDialogueList);
  const {completed} = SingleInfoStore();
  const getContent = () => {
    axios
      .get(`${store.baseUrl}/edu/${content_id}`)
      .then((response) => {
        const data = response.data;
        setDialogueList(data.dialogueList);
        setLoading(true);
      })
      .catch((error) => {
        console.error('Error fetching content: ', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    SoundStore.getState().stopBackgroundMusic();
    SingleSoundStore.getState().playSingleBgm();

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const timer = setTimeout(() => {
      setShowDialogue(true);
    }, 5000);

    return () => {
      SingleSoundStore.getState().stopSingleBgm();
      SoundStore.getState().playBackgroundMusic();
      clearTimeout(timer);
    };
  }, [content_id]);

  const { playClickSoundSingle } = SingleSoundStore();

  const changePage = (increment) => {
    console.log('click');
    if (loading || !showDialogue) return;
    // 모달이 열려있으면 모달을 닫고 함수 종료
    if (isModalOpen) {
      handleCloseModal();
      return;
    }
    console.log(isModalOpen);
    // 채팅이 열려있으면 페이지 변경을 하지 않고 함수 종료
    if (isChatOpen) {
      console.log(isChatOpen);
      handleChatOpen();
      return;
    }
    console.log('111');
    console.log(page);
    if (increment) {
      if (page < dialogueList.length - 1) {
        setPage((prevPage) => prevPage + 1);
      } else {
        setIsModalOpen(true);
      }
    } else {
      if (0 < page) {
        setPage((prevPage) => prevPage - 1);
      } else {
        setPage(0);
      }
    }
    playClickSoundSingle();
    console.log(page);
  };
  const handleChatOpen = () => {
    console.log('chat handle');
    if (isChatOpen) {
      setIsChatOpen(false); // 채팅 닫기
    } else {
      setIsChatOpen(true); // 채팅 열기
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const goToList = () => {
    if(!completed[content_id]?.complete){
      axios({
        method: 'post',
        url: `${store.baseUrl}/edu`,
        headers: {
          "Authorization" : `Bearer ${store.accessToken}`	
        }
      })
    }
    navigate('/single-main');
  };

  const currentDialogue = dialogueList[page] || {};

  const ChatButton = () => {
    const handleClick = (e) => {
      e.stopPropagation(); // 페이지 이동을 방지
      handleChatOpen();
    };
    if (!isChatOpen) {
      return (
        <div style={styles.chatButton} onClick={handleClick}>
          채팅
        </div>
      );
    }

    return (
      <div style={styles.chatButton} onClick={handleClick}>
        채팅
        <ChatModal />
      </div>
    );
  };

  const renderImages = () => {
    const images = [];
    for (let i = 0; i < currentDialogue.imageCount; i++) {
      images.push(
        <S.ImageContentBox
          key={i}
          style={{
            top: currentDialogue.imageCount === 1 ? '30vh' : `${20 + i * 25}vh`,
            right: currentDialogue.imageCount === 1 ? '20vw' : '30vw',
            width: currentDialogue.imageCount === 1 ? '30vw' : '20vw',
            height: currentDialogue.imageCount === 1 ? '40vh' : '20vh',
          }}
        >
          <img
            src={`/single-image/${content_id}-${page}-${i + 1}.png`}
            alt={`content ${i + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </S.ImageContentBox>
      );
    }
    return images;
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <S.PlayView
      onClick={() => {
        changePage(true);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        changePage(false);
      }}
    >
      <SingleBanner />

      <S.ImageBox>
        {renderImages()}
        <S.CharacterImage
          src="/character-test-removebg-preview.png"
          alt=""
          style={{
            left: currentDialogue.imageCount > 0 ? '10vw' : '30vw',
          }}
        />
      </S.ImageBox>
      {showDialogue && (
        <S.DialogueSection>
          <ChatButton></ChatButton>
          <S.DialogueBox>
            <S.DialogueHeader>
              <S.CharacterName>
                <span>
                  <CgProfile />
                  <span> Hoshino Ai {content_id}</span>
                </span>
              </S.CharacterName>
            </S.DialogueHeader>

            <S.DialogueBody>
              <S.DialogueBodyLeft>
                <p>
                  <FaRegCommentDots />
                </p>
              </S.DialogueBodyLeft>
              <S.DialogueContent>
                <TypeAnimation
                  key={page}
                  style={{
                    color: 'black',
                    whiteSpace: 'pre-line',
                  }}
                  sequence={[currentDialogue.script_content, 500]}
                  wrapper="p"
                  speed={50}
                />
              </S.DialogueContent>
            </S.DialogueBody>
            <S.DialogueBodyRight>
              <p>
                <PiMouseLeftClick /> 클릭 : 다음
              </p>
              <p>
                <PiMouseRightClick /> 우클릭 : 이전
              </p>
            </S.DialogueBodyRight>
          </S.DialogueBox>
        </S.DialogueSection>
      )}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>학습을 완료하시겠습니까?</h2>
        <button onClick={goToList}>학습 완료</button>
        <button onClick={handleCloseModal}>닫기</button>
      </ReactModal>
    </S.PlayView>
  );
}

// 스타일을 위한 객체
const styles = {
  chatButton: {
    position: 'fixed',
    right: '10px',
    bottom: '30vh',
    backgroundColor: 'yellow',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
  },
};