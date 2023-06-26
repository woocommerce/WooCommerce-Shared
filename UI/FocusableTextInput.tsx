import React, {Component} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

interface FocusableTextInputProps extends TextInputProps {
  style?: Object;
}

interface FocusableTextInputState {
  isFocused: boolean;
}

class FocusableTextInput extends Component<FocusableTextInputProps, FocusableTextInputState> {
  handleFocus: () => void;
  handleBlur: () => void;

  constructor(props: FocusableTextInputProps) {
    super(props);

    this.state = {
      isFocused: false,
    };

    this.handleFocus = () => this.setState({ isFocused: true });
    this.handleBlur = () => this.setState({ isFocused: false });
  }

  render() {
    const { style, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const inputBorderColor = isFocused ? '#896bb8' : 'gray';

    return (
        <TextInput
            style={[styles.input, { borderColor: inputBorderColor }, style]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...otherProps}
        />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default FocusableTextInput;