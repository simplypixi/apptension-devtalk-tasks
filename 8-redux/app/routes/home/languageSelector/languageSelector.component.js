import React, { PropTypes, PureComponent } from 'react';
import { get } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import { appLocales } from '../../../i18n';
import { DEFAULT_LOCALE } from '../../../modules/locales/locales.redux';


export class LanguageSelector extends PureComponent {
  static propTypes = {
    language: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  handleLanguageChange = (event, index, value) => {
    this.props.setLanguage(value);

    const currentLanguage = get(this.props.router, 'params.lang', DEFAULT_LOCALE);
    const currentLanguageUrl = currentLanguage !== DEFAULT_LOCALE ? `/${currentLanguage}` : '';
    const targetLanguageUrl = value !== DEFAULT_LOCALE ? `/${value}` : '';

    let targetUrl = this.props.router.location.pathname.replace(currentLanguageUrl, targetLanguageUrl);
    if (targetUrl.slice(-1) === '/' && targetUrl !== '/') {
      targetUrl = targetUrl.slice(0, -1);
    }

    this.props.router.push(targetUrl);
  };

  render() {
    return (
      <div className="lang">
        <div className="lang__box">
          <SelectField
            value={this.props.language}
            onChange={this.handleLanguageChange}
            className="lang__selector"
          >
            {appLocales.map((locale) => (
              <MenuItem value={locale} primaryText={locale.toUpperCase()} />
            ))}
          </SelectField>
        </div>
      </div>
    );
  }
}
