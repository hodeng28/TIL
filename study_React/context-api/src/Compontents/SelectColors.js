import { ColorConsumer } from "../Contexts/color";

const colors = ["red", "yellow", "green", "blue", "orange", "skyblue"];

const SelectColor = () => {
  return (
    <>
      <h3>Choose Color!</h3>
      <ColorConsumer>
        {({ action }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => action.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault(); // 마우스 오른쪽 클릭시 브라우저 메뉴 막기
                  action.setSubcolor(color);
                }}
              ></div>
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </>
  );
};

export default SelectColor;
