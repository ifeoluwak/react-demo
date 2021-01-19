import { reducerActions } from "../reducer";

export const movies = {
  state: {
    isServerError: false,
    data: [],
  },
  reducers: reducerActions,
  effects: (dispatch) => ({
    async getMovies(payload, rootState) {
      dispatch.movies.setError(false);
      try {
        const data = await fetch("https://swapi.dev/api/films/");
        const res = await data.json();
        dispatch.movies.setState({ data: res.results });
      } catch (error) {
        dispatch.movies.setError(true);
      }
    },
    async saveMovies(payload, rootState) {
      const { data } = rootState.movies;
      try {
        const newData = [...data, payload.movie];
        dispatch.movies.setState({ data: newData });
      } catch (error) {
        dispatch.movies.setError(true);
      }
    },
  }),
};
