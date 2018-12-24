import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

const timeout = 2500;
export default class DynamicAlertsManager extends React.Component {

  static propTypes = {
    showAlert: PropTypes.string
  }

  state = {
    alerts: []
  }

  addAlert = (text, type = 'success') => {
    const newAlert = {
      text,
      type,
      key: Date.now()
    }

    this.setState({
      alerts: [...this.state.alerts, newAlert]
    })

    setTimeout(() => {
      this.setState({
        alerts: this.state.alerts.filter(a => a !== newAlert)
      })
    }, timeout)
  }




  render() {
    const { alerts } = this.state; 

    return(
      <React.Fragment>
        {React.cloneElement(this.props.children, { addAlert: this.addAlert })}

        <Transition
          items={alerts.reverse()}
          keys={m => m.key}
          from={{ opacity: 0, transform: 'translate3d(0, -30px, 0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
          leave={{ opacity: 0 }}>
          
          {item => transitionProps => 
            <div
              style={transitionProps}
              >
              {item.text}
              <style jsx>{`
                div {
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 3px; 
                  padding: 10px 20px;

                  ${item.type === 'success' ? `
                    background-color: #22ef22;
                    border-color: #037903;
                  `: `
                    background-color: #ff9090;
                    border-color: #860606;
                  `}
                }
              `}</style>
            </div>
          }

        </Transition>
      </React.Fragment>
    )
  }


}