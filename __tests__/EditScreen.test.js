import EditScreen from "../screens/EditScreen";
import { render } from "@testing-library/react-native";

const navOptions = {
  navigation: {
    setOptions: () => {},
  },
};

describe("<EditScreen />", () => {
  it("should match snapshot", () => {
    const snap = render(
      <EditScreen route={{ params: { data: "somedata" } }} {...navOptions} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
