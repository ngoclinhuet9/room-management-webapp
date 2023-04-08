/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { Helmet } from 'react-helmet'
import HomeComponent from 'components/home/Home'
import Layout from '../../layouts/Layout'

export default function Home() {
  return (
    <Layout>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <HomeComponent />
    </Layout>
  )
}
