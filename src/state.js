import { configureStore, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";

// interface GameState {
//    difficulty: number; // 難易度
//    windows: window[];
//    skills: string[]; // スキル
//    elapsedTime: number; // 経過時間
//    gameScore: number; // スコア



const pageSlice = createSlice( {
   name: "page",
   initialState: null,
   reducers: {
      startGame: () => {
         console.log( "start game" );
      },
      endGame: () => {
         console.log( "end game" );
      },
      resetPage: () => {
      },
   },
} );


export const { EASY, NORMAL, HARD } = {
   EASY: 0,
   NORMAL: 1,
   HARD: 2,
};

const difficultySlice = createSlice( {
   name: "difficulty",
   initialState: EASY,
   reducers: {
      setDifficulty: ( state, action ) => {
         return action.payload;
      },
   },
} );

const popUpSlice = createSlice( {
   name: "windows",
   initialState: [],
   reducers: {
      addPopUp: ( state, action ) => {
         state.push( action.payload );
      },
      removePopUp: ( state, action ) => {
         return state.filter( ( win ) => win.id !== action.payload.id );
      },
      resetWindows: () => {
         return [];
      }
   },
} );

const timerSlice = createSlice( {
   name: "timer",
   initialState: 0,
   reducers: {
      setTimer: ( state, action ) => {
         return action.payload;
      },
   },
} );

const userSlice = createSlice( {
   name: "user",
   initialState: {
      user_name: "",
      score: 0,
   },
   reducers: {
      setUserName: ( state, action ) => {
         return {
            ...state,
            user_name: action.payload,
         };
      },
      setScore: ( state, action ) => {
         return {
            ...state,
            score: action.payload,
         };
      },
      incrementScore: ( state ) => {
         return {
            ...state,
            score: state.score + 1,
         };
      },
      resetScore: (state) => {
         return {
            ...state,
            score: 0,
         };
      }
   }
} );

const listenerMiddleware = createListenerMiddleware();

export const GameState = configureStore( {
   reducer: {
      difficulty: difficultySlice.reducer,
      popups: popUpSlice.reducer,
      timer: timerSlice.reducer,
      page: pageSlice.reducer,
      user: userSlice.reducer,
   },
   middleware: ( getDefaultMiddleware ) =>
      getDefaultMiddleware().prepend( listenerMiddleware.middleware )
} );

export const { startGame, endGame, resetPage } = pageSlice.actions;
export const { setDifficulty } = difficultySlice.actions;
export const { addPopUp, removePopUp, resetWindows } = popUpSlice.actions;
export const { setTimer } = timerSlice.actions;
export const { setUserName, setScore, incrementScore, resetScore } = userSlice.actions;
