import { reducerActions } from "../reducer";

const parseUrl = (url = "") =>
  url.includes("https") ? url : url.replace("http", "https");

export const planet = {
  state: {
    isServerError: false,
    data: {},
  },
  reducers: reducerActions,
  effects: (dispatch) => ({
    async getPlanets(payload, rootState) {
      dispatch.planet.setError(false);
      const { data = {} } = rootState.planet;
      const { planets, movieId } = payload;
      if (!planets.length || data[movieId]) return;
      try {
        const response = await Promise.all(
          planets.map((url) => fetch(parseUrl(url)))
        );
        const planetResponse = await Promise.all(
          response.map(async (i) => {
            let planet = await i.json();
            return planet;
          })
        );
        const newData = { ...data, [movieId]: planetResponse };
        dispatch.planet.setState({
          data: newData,
        });
      } catch (error) {
        dispatch.planet.setError(true);
      }
    },
    async savePlanets(payload, rootState) {
      const { data } = rootState.planet;
      const { planets, movieId } = payload;
      const newData = { ...data, [movieId]: planets };
      dispatch.planet.setState({
        data: newData,
      });
    },
    clear() {
      dispatch.planet.setState({ data: {} });
    },
  }),
};
