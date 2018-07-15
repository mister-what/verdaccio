import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import filter from 'lodash/filter';
import size from 'lodash/size';
import uniqBy from 'lodash/uniqBy';
import Module from '../../Module';

import classes from './style.scss';
import MaintainerInfo from './MaintainerInfo';

export default class Maintainers extends React.Component {
  static propTypes = {
    packageMeta: PropTypes.object.isRequired
  };

  state = {};

  constructor(props) {
    super(props);
  }

  get author() {
    return get(this, 'props.packageMeta.latest.author');
  }

  get contributors() {
    let contributors = get(this, 'props.packageMeta.latest.contributors', []);
    return filter(uniqBy(contributors, (contributor) => contributor.name), (contributor) => {
      return contributor.name !== get(this, 'author.name') && contributor.email !== get(this, 'author.email');
    }).sort(({name: l}, {name: r}) => l.localeCompare(r));
  }

  get showAllContributors() {
    return this.state.showAllContributors || size(this.contributors) <= 5;
  }

  get shortContributorList() {
    if (!this.contributors) {
      return [];
    }
    return this.contributors.slice(0, 5);
  }

  handleShowAllContributors = () => {
    this.setState({
      showAllContributors: true
    });
  };

  renderContributors() {
    if (!this.contributors) return null;

    return (this.showAllContributors ? this.contributors : this.shortContributorList)
      .map(({name, avatar}) => {
        return <MaintainerInfo
          key={name}
          title="Contributors"
          name={name}
          avatar={avatar}/>;
      });
  }

  render() {
    let author = this.author;

    return (
      <Module title={`Maintainers (${this.contributors.length + 1})`} className={classes.maintainersModule}>
        <ul className="maintainer-author">
          {author && <MaintainerInfo title="Author" name={author.name} avatar={author.avatar} />}
          {this.renderContributors()}
        </ul>
        {!this.showAllContributors && (
          <button
            onClick={this.handleShowAllContributors}
            className={classes.showAllContributors}
            title={`Show all ${this.contributors.length + 1} contributors`}
          >
            Show all
          </button>
        )}
      </Module>
    );
  }
}
