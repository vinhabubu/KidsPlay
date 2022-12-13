const images = {
  bgmain: require('../assets/drawable/bg_main.png'),
  splash: require('../assets/drawable/splash.png'),
  // btnback: require('../asset/drawable/btn_back_150.png'),
  // setting: require('../asset/drawable/ic_setting.png'),
  // btnprev: require('../asset/drawable/btn_prev_150.png'),
  // btnnext: require('../asset/drawable/btn_next_150.png'),
  // bgview: require('../asset/drawable/bg_view.png'),
};

export default (imageName: keyof typeof images) => {
  return images[imageName];
};
