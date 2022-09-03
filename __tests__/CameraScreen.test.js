import CameraScreen from "../screens/CameraScreen";
import { render } from "@testing-library/react-native";

const navOptions = {
  navigation: {
    getState: () => {},
  },
};

describe("<CameraScreen />", () => {
  it("should match snapshot", () => {
    const snap = render(
      <CameraScreen route={{ params: { data: "somedata" } }} {...navOptions} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
