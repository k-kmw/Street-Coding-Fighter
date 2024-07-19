package com.scf.user.application.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserLoginResponseDto {

    private String accessToken;
    private String refreshToken;
    private String name;
    private String userId;

}