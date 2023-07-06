import { render } from '@testing-library/react-native';
import FocusableTextInput from '../UI/FocusableTextInput';

test('renders FocusableTextInput', () => {
  const { toJSON } = render(<FocusableTextInput />);
  expect(toJSON()).toMatchSnapshot();
});