import React, { PropTypes, PureComponent } from 'react';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

import { translationMessages } from '../i18n';

export class App extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    router: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  render() {
    if (!this.props.language) {
      return null;
    }

    return (
      <div className="app">
        <Helmet
          titleTemplate="%s - Apptension React Boilerplate"
          defaultTitle="Apptension React Boilerplate"
          meta={[
            { name: 'description', content: 'Apptension React Boilerplate application' },
          ]}
        />

        <IntlProvider
          locale={this.props.language}
          messages={translationMessages[this.props.language]}
        >
          {React.Children.only(this.props.children)}
        </IntlProvider>
      </div>
    );
  }
}
