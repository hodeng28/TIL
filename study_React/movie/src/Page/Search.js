import { useEffect } from "react";
import { moviesApi } from "../api";

const Search = () => {
  const [searchState, setSearchState] = useState([]);
  const state = useGetState();
  const dispatch = useGetDispatch();

  const inputState = state.inputState;
  const movie = searchState;
  const { changeInput, saveKeyword } = dispatch;
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const enterKeyword = async (e) => {
    if (e.keyCode === 13) {
      const keyword = e.target.value;
      saveKeyword(keyword);
      inputRef.current.value = "";
      const data = await movies.searchMovies(keyword);
      await setSearchState(data.data.results);
    }
  };
  const changeKeyword = (e) => {
    changeInput(e.target.value);
  };
  const keywords = inputState.keyword === undefined ? [] : inputState.keyword;

  console.log(keywords);

  return (
    <div>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={enterKeyword}
          onChange={changeKeyword}
        />
        <p>
          {keywords.length !== 0
            ? keywords.map((k) => {
              return <span>{k}</span>;
            }) : "검색"}
        </p>
      </div>
    </div>

  )
}