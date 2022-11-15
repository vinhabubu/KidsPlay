package com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.interfaces;

public interface AdsCallback {

    void adLoadingFailed();

    void adClose();

    void startNextScreen();

    void onLoaded();
}