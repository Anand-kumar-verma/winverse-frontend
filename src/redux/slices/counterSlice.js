import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "aviator",
  initialState: {
    value: 0,
    user_id:localStorage.getItem("user_id"),
    // by user enabling and dissabling music and sound
    isEnableMusic: false,
    isEnableSound: false,
    // by timing enabling and dissabling music and sound
    byTimeEnablingMusic: false,
    byTimeEnablingSound: false,
    backgroundImage_url:
      localStorage.getItem("bg_image") ||
      "https://res.cloudinary.com/do7kimovl/image/upload/v1709114502/circle_dafpdo.svg",
    backgroundMusic_url:
      localStorage.getItem("bg_music") ||
      "https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3",
    waiting_aviator: true,
    just_start_after_waiting:true,
    please_reconnect_the_server:false,
    dummycounter:1,
    next_step:Date.now(),
    pendingIds:[],
    aviator_login_data:null,
    trx_game_image_index:["A","B","C","D","E"],
    gameHistory_trx_one_min:[],
    myHistory_trx_one_min:[],
    wallet_real_balance:0.0

  },
  reducers: {
    // main music and sound enabling and dessabling
    isEnableMusicFun: (state) => {
      state.isEnableMusic = !state.isEnableMusic;
    },
    isEnableSoundFun: (state) => {
      state.isEnableSound = !state.isEnableSound;
    },
    // by time enabling and dessabling music and sound
    byTimeIsEnableMusic: (state, actions) => {
      state.byTimeEnablingMusic = actions.payload;
    },
    byTimeIsEnableSound: (state, actions) => {
      console.log("function  is sound enable is called", actions.payload);
      state.byTimeEnablingSound = actions.payload;
    },
    backgroundImageFun: (state, actions) => {
      state.backgroundImage_url = actions.payload;
    },
    backgroundMusicFun: (state, actions) => {
      state.backgroundMusic_url = actions.payload;
    },
    waitingAviatorFun: (state, actions) => {
      state.waiting_aviator = actions.payload;
    },
    just_start_after_waitingFun: (state, actions) => {
      state.just_start_after_waiting = actions.payload;
    },
    please_reconnect_the_serverFun: (state, actions) => {
        console.log("Sannad",actions.payload)
      state.please_reconnect_the_server = actions.payload;
    },
    dummycounterFun: (state) => {
      state.dummycounter += 1;
    },
    updateNextCounter: (state,actions) => {
      state.next_step= actions.payload;
    },
    pendingIdsFunction: (state,actions) => {
      state.pendingIds = actions.payload;
    },
    aviator_login_data_fn: (state,actions) => {
      state.aviator_login_data = actions.payload;
    },
    trx_game_image_index_function: (state,actions) => {
      state.trx_game_image_index = actions.payload;
    },
    getUserIdFn: (state,actions) => {
      state.user_id = actions.payload;
    },
    gameHistory_trx_one_minFn: (state,actions) => {
      state.gameHistory_trx_one_min = actions.payload;
    },
    myHistory_trx_one_minFn: (state,actions) => {
      state.myHistory_trx_one_min = actions.payload;
    },
    wallet_real_balanceFn: (state,actions) => {
      state.wallet_real_balance = actions.payload;
    },
  },
});

export const {
  isEnableMusicFun,
  isEnableSoundFun,
  byTimeIsEnableMusic,
  byTimeIsEnableSound,
  backgroundImageFun,
  backgroundMusicFun,
  waitingAviatorFun,
  just_start_after_waitingFun,
  please_reconnect_the_serverFun,
  dummycounterFun,
  updateNextCounter,
  pendingIdsFunction,
  aviator_login_data_fn,
  trx_game_image_index_function,
  getUserIdFn,
  gameHistory_trx_one_minFn,
  wallet_real_balanceFn,
  myHistory_trx_one_minFn
} = slice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state) => state.aviator.value;

export default slice.reducer;
