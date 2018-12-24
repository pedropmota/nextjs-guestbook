import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import loadFonts from "./FontLoader";

const Menu = withRouter(({ router }) =>
  <div className="menu">
    <Link href="/">
      <a 
        className={`link ${router.route === '/' ? 'current' : ''}`}  >
        Guestbook
      </a>
    </Link>
    <Link href="/visits">
      <a
        className={`link ${router.route === '/visits' ? 'current' : ''}`}>
        All Visits
      </a> 
    </Link>
    <a
      href="https://github.com/pedropmota/nextjs-guestbook"
      className={`link`}
      target="blank">
      GitHub
    </a>

    <style jsx>{`
       .link {
        width: 33.33%;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        //background-color: #d8d8d8;
        padding: 14px 0;
        transition: all 0.3s;
      }
      .link.current {
        font-weight: bold;
      } 
      .link:hover {
        background-color: #e6e6e6;
        text-decoration: underline;
      }
      .link:active {
        background-color: #f6f6f6;
        color: black;
      }
    `}</style>
  </div>
)

export default class Layout extends React.Component {

  componentDidMount() {
    loadFonts()
  }

  render () {
    return (
      <div className="layout-container">
        
        <header>
          <div className="title">
            <h1>
              Welcome to the Remedy Health Media guestbook!
            </h1>
          </div>

          <Menu />
        </header>

        <div className="content-container">
          {this.props.children}
        </div>

        <style jsx global>{`
          html, body, #__next {
            height: 100%;
            margin: 0;
          }
          body {
            background-color: #eaeaea;
            font-family: 'Fira Sans', sans-serif;
          }
          body:not(.fonts-loaded) {
            opacity: 0;
          }
        `}</style>

        <style jsx>{`
          .layout-container {
            text-align: center;
            max-width: 1024px;
            height: calc(100% - 30px);
            margin: 10px auto 20px;
            
            border: 1px solid #c5c5c5;
            border-radius: 5px;
            background-color: white;
          }

         

          .content-container {
            padding: 20px 20px 20px;

          }
        `}</style>

      </div>
    )
  }
}

