import React from 'react'
import 'isomorphic-fetch';

export default class GuestbookList extends React.Component {

  state = {
    list: []
  }

  async componentDidMount() {
    this.doFetchRequest()
  }

  async doFetchRequest() {
    try {
      const result = await fetch('/api/guestbook');

      const guestbookList = await result.json()

      this.setState({
        list: guestbookList.reverse()
      })
    } catch (e) {
      return this.props.addAlert(`There was an error retrieving your information: ${e}`)
    }
  }

  render() {
    const { list } = this.state
    
    return (
      <div className="container">
        <h2>All visits</h2>

        {!list.length && 
          <div>You're the first one to arrive here! No other guests confirmed yet.</div>
        }

        {list.map((post, i) => 
          <div className="post" key={i}>
            <div className="description">
              <span className="name">{post.name}</span>&nbsp;
              <span className="minor">at</span>&nbsp;
              <span className="time">{(new Date(post.addedAt)).toLocaleString()}</span>&nbsp;
              <span className="minor">said:</span>
            </div>
            <p>{post.message}</p>
          </div>
        )}

        
        <style jsx>{`
          .post {
            text-align: left;
          }

          .post:not(:last-child) {
            padding: 6px 0 8px;
            border-bottom: 1px dashed #828282;
          }


          .name, .time {
            display: inline-block;
          }

          .name {
            font-weight: bold;
          }

          .minor {
            font-size: 13px;
          }
        `}</style>

      </div>
      
    )
  }



}