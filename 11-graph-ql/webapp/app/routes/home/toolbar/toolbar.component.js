import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ToolbarContainer, Dot, ToolbarButton } from './toolbar.styles';

export class Toolbar extends PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onCreateNew: PropTypes.func.isRequired,
    disableCreate: PropTypes.bool
  };

  render() {
    return (
      <ToolbarContainer>
        <Dot color="#fe5f58" />
        <Dot color="#ffc330" />
        <Dot color="#29ca42" />

        <ToolbarButton
          disabled={this.props.disableCreate}
          onClick={this.props.onCreateNew}
        >
          Nowa
        </ToolbarButton>
        <ToolbarButton onClick={this.props.onDelete}>Usuń</ToolbarButton>
      </ToolbarContainer>
    );
  }
}
