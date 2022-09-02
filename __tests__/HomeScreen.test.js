import HomeScreen from '../screens/HomeScreen'

import { render } from '@testing-library/react-native';


const navOptions = {
  navigation: {
  setOptions: () => {},
  }
}

describe('<HomeScreen />', () => {
  it('should match snapshot', () => {
    const snap = render(<HomeScreen route={{params: {data:'somedata'} }} {...navOptions} />).toJSON();
    expect(snap).toMatchSnapshot();
  })
});
