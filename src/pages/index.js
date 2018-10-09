import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>Hi folks!</h1>
    <p>Welcome to my new Gatsby site for the 2018 freeCodeCamp.org JAMstack Hackathon!</p>
    <p>Now excuse me while I go and build something great ;)</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
