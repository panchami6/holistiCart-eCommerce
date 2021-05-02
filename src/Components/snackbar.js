import React from 'react'

export default function snackbar() {
    console.log("snackbar");
    return (
        
        <div id="snackBarId">
            {/* <h1>SnackBar</h1>
            <br />
          <button class="primary-btn snack-btn">Click Here</button>
            <br />
            <br /> */}
            <div class="snackBar">
                <div>Successfully removed</div>
                <span class="snackbar-close">X</span>
            </div>
        </div>
       
    )
}
