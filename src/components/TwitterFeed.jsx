import React from 'react';

import {
  List,
  Avatar,
} from 'antd';
import {
  utilique,
} from 'que-series';
import { IconText } from './IconText.jsx';

const { request } = utilique;

class TwitterFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
    };

    console.log((this.props.symbol != undefined && this.props.symbol.length > 0 ? `$${this.props.symbol}` : 'from:OutsmartO'));
    request.postFetchReq('/api/twitter/search', JSON.stringify({ q: (this.props.symbol != undefined && this.props.symbol.length > 0 ? `$${this.props.symbol}` : 'from:OutsmartO') }), (data) => {
      if (!data.error && data.tweets != undefined && data.tweets.length > 0) {
        this.setState(() => ({ tweets: data.tweets }));
      }
    });
  }

  render() {
    console.log(this.state.tweets);
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={this.state.tweets}
        footer={(
          <div>
            <b>Tweets</b>
          </div>
                  )}
        renderItem={(tweet) => (
          <List.Item
            key={tweet.id}
            actions={[
              <IconText type="heart" href={`https://twitter.com/i/web/status/${tweet.id_str}`} text={tweet.favorite_count} key="likes" />,
              <IconText type="retweet" href={`https://twitter.com/i/web/status/${tweet.id_str}`} text={tweet.retweet_count} key="retweets" />,
              <IconText type="twitter" href={`https://twitter.com/i/web/status/${tweet.id_str}`} text="" key="link" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={tweet.user.profile_image_url_https} />}
              title={`${tweet.user.name} - @${tweet.user.screen_name}`}
            />
            {tweet.text}
          </List.Item>
        )}
      />
    );
  }
}

export default TwitterFeed;
