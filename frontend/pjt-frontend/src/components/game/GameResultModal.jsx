import React, { useRef, useEffect, useState } from "react";
import RankingGraph from "../ranking/RankingGraph";
import S from '../ranking/styled.jsx';


const GameResultModal = () => {
  
  const [modalOpen, setModalOpen] = useState(true);
  const modalOutsisde = useRef();

  return (
    <>
      {
        modalOpen &&
        <div className={'result-modal-container'} ref={modalOutsisde} onClick={e => {
          if (e.target === modalOutsisde.current) {
            setModalOpen(false);
          }
        }}>
          <div className="result-modal-content">
              <RankingGraph />
          </div>
        </div>
      }
    
    </>
  );
}

export default GameResultModal;