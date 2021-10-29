import React, { Component } from 'react'

import { PromoCode, PromoDay } from '../../components'

export class Promotions extends Component {
  render() {
    return (
      <div className="promotions">
        <PromoDay />
        <PromoCode />
      </div>
    )
  }
}

export default Promotions
