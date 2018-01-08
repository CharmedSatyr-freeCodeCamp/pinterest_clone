'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

/*** MAIN ***/
/* This is a duplicate of the loader HTML in login.html and index.html
 * and uses the same SCSS. Built here in React for use in components. */
const Loader = () => {
  return (
    <div className="loader">
      <div className="circ">
        <div className="swirl">
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="hands" />
        </div>
        <div className="head">
          <div className="eye" />
          <div className="nose" />
          <div className="cheeks" />
          <div className="beard" />
        </div>
      </div>
    </div>
  )
}

export default Loader
