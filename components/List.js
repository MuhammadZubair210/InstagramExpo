import React from 'react';
import { FlatList } from 'react-native';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {
renderItem = ({ item, index }) =>
(
<Item _onRefresh={this.props._onRefresh} key={item.key} ind={index} dat={this.props.dat} likefunc={this.props.like}  {...item} />

)
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List;
