import React from 'react';
import { Transition } from 'react-spring';

const TIMEOUT = 2500;
const ALERT_TYPES = ['success', 'error']


/**
 * A component that manages and displays alerts. 
 * It that wraps other components and adds the 'addAlert' function to them as a prop.
 */
export default class DynamicAlertsManager extends React.Component {

  state = {
    alerts: []
  }

  addAlert = (text, type = 'success') => {
    if (!ALERT_TYPES.includes(type))
      throw new Error(`Invalid alert type. Values supported: ${ALERT_TYPES.join(', ')}`)

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
    }, TIMEOUT)
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