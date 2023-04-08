/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Helmet } from 'react-helmet'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Layout(props: any) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
