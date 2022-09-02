import HomeScreen from '../screens/HomeScreen'
import AddItemScreen from '../screens/AddItemScreen'
import DetailsScreen from '../screens/DetailsScreen'


import { render } from '@testing-library/react-native';


const navOptions = {
  navigation: {
  setOptions: () => {},
  }
}

describe('<DetailsScreen />', () => {
  it('should match snapshot', () => {
    // const fabricData = fabricData?.map();
    const snap = render(<DetailsScreen route={{params: {data:{ uri:'data'} } }} {...navOptions} />).toJSON();
    expect(snap).toMatchSnapshot();
  })

  // it('should match snapshot', () => {
  //   const snap = render(<DetailsScreen route={{params: {data: 'data'} }} {...navOptions} />).toJSON();
  //   expect(snap).toMatchSnapshot();
  // })
});
