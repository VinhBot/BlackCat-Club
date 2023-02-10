/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const tmdbEndpoint = "https://api-zingmp3.vercel.app/api";
const tmdAPI = {
   //  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_ey=${apiKey}`,
   getHomePage: () => `${tmdbEndpoint}/home`,
   // get Zing Chart :
   getTopChart: () => `${tmdbEndpoint}/homechart`,
   // get RadioPage :
   getRadioPage: () => `${tmdbEndpoint}/radio`,
   // get New Feed :
   getNewFeed: (id, page) => `${tmdbEndpoint}/newfeeds?id=${id}&page=${page}`,
   // get Mới Phát Hành :
   getNewSong: () => `${tmdbEndpoint}/newreleasechart`,
   // get Thể Loại :
   getHubHome: () => `${tmdbEndpoint}/hubhome`,
   // get Hub Detail:
   getHubDetail: (id) => `${tmdbEndpoint}/hubdetails/${id}`,
   // get Top100Page :
   getTop100Page: () => `${tmdbEndpoint}/top100`,
   // get List Mv :
   getListMv: (id, page) => `${tmdbEndpoint}/listmv?id=${id}&page=${page}&count=19`,
   // get Category Mv :
   getCategoryMv: (id) => `${tmdbEndpoint}/categorymv/${id}`,
   // get Mv:
   getVideoMv: (id) => `${tmdbEndpoint}/mv/${id}`,
   // get getArtistPage:
   getArtistPage: (id) => `${tmdbEndpoint}/artist/${id}`,
   // get getAlbumPage :
   getAlbumPage: (id) => `${tmdbEndpoint}/playlist/${id}`,
   getSuggestedAlbum: (id) => `${tmdbEndpoint}/suggestedplaylists/${id}`,
   //  get từ khóa hot  :
   getHotKeyApi: () => `${tmdbEndpoint}/recommendkeyword`,
   // lấy key gợi ý :
   getHotSuggestionApi: (keyword) => `${tmdbEndpoint}/suggestionkeyword?keyword=${keyword}`,
   getSearchByType: (keyword, type) => `${tmdbEndpoint}/searchtype?keyword=${keyword}&type=${type}`,
   //  bắt đầu search :
   getSearchAllKeyApi: (keyword) => `${tmdbEndpoint}/searchall?keyword=${keyword}`,
   // Lyrics :
   getLyrics: (id) => `${tmdbEndpoint}/songlyrics/${id}`,
};
/*========================================================*/
function useGetHomePage() {
   return useQuery(["getHotKey"], async() => {
         const data = await axios.get(tmdAPI.getHomePage())
         return data.data
      },{ keepPreviousData: true });
};
const getHomePage = async () => {
   const res = await axios.get(tmdAPI.getHomePage());
   return res.data;
};
/*========================================================*/
const useGetHomeChart = () => {
   return useQuery(["getChartPage"], async() => {
         const data = await axios.get(tmdAPI.getTopChart())
         return data.data
   },{ keepPreviousData: true })
}
/*========================================================*/
const getHotKey = async () => {
   const res = await axios.get(tmdAPI.getHotKeyApi())
   return res.data
}
/*========================================================*/
const getHubHome = () => {
   return useQuery(["getHubHome"], async() => {
         const data = await axios.get(tmdAPI.getHubHome())
         return data.data
    },{ keepPreviousData: true });
};
/*========================================================*/
const getNewSongRelease = () => {
   return useQuery(["getNewSongRelease"], async() => {
         const data = await axios.get(tmdAPI.getNewSong())
         return data.data
    }, { keepPreviousData: true });
};
/*========================================================*/
const getTop100page = () => {
   return useQuery(["getTop100Page"], async () => {
         const data = await axios.get(tmdAPI.getTop100Page())
         return data.data
   }, { keepPreviousData: true });
};
/*========================================================*/
const useGetRadioPage = () => {
   return useQuery(["getRadioPage"], async() => {
         const data = await axios.get(tmdAPI.getRadioPage())
         return data.data
   }, { keepPreviousData: true })
};
/*========================================================*/
/*========================================================*/
/*========================================================*/
/*========================================================*/
/*========================================================*/
export {
  getHotKey, useGetRadioPage, useGetHomeChart, getHomePage, useGetHomePage, tmdAPI, getTop100page, getNewSongRelease, getHubHome
}