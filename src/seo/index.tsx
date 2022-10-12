import AuthorService from '../services/authorService';
import BlogDetailPage from './home/blog/BlogDetailPage';
import BlogListPage from './home/blog/BlogListPage';
import BlogService from '../services/blogService';
import BrokerArticleService from '../services/brokerArticleService';
import BrokerComparePage from './home/broker/BrokerComparisonPage';
import BrokerService from '../services/brokerService';
import BrokerViewPage from './home/broker/BrokerViewPage';
import CategoryService from '../services/categoryService';
import ComparisonPage from './home/broker/ComparisonPage';
import Contact from './home/Contact';
import GeneralPage from './home/GeneralPage';
import HomeViewPage from './home/HomeViewPage';
import isbot from 'isbot';
import PageService from '../services/pageService';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const handleSEO = async (req, res) => {
  if (!isbot(req.get('user-agent'))) {
    return false;
  }

  const { rows: topBrokers } = await new BrokerService(
    req,
  ).findAndCountAll({
    filter: {
      activated: true,
      top_broker: true,
    },
    orderBy: 'broker_rating.overall_rating_desc',
  });

  const props = {
    topBrokers,
  };

  const url = req.url.replace(/\/$/, '');

  if (req.url === '') {
    return res.send(
      ReactDOMServer.renderToString(
        <HomeViewPage {...props} />,
      ),
    );
  } else if (url === '/kontakt') {
    return res.send(
      ReactDOMServer.renderToString(<Contact />),
    );
  } else if (url === '/broker-vergleich') {
    const category = await new CategoryService(
      req,
    ).findByURL(url);
    const author = await new AuthorService(req).first();
    return res.send(
      ReactDOMServer.renderToString(
        <ComparisonPage
          category={category}
          author={author}
          {...props}
        />,
      ),
    );
  } else if (url === '/forex-cfd-broker-vergleich') {
    return res.send(
      ReactDOMServer.renderToString(<BrokerComparePage />),
    );
  } else if (req.url === '/blog') {
    const { rows: blogs } = await new BlogService(
      req,
    ).findBlogList({ limit: 10 });
    return res.send(
      ReactDOMServer.renderToString(
        <BlogListPage records={blogs} />,
      ),
    );
  } else if (/^\/blog\//.test(url)) {
    const blog = await new BlogService(req).findByURL(url);
    return res.send(
      ReactDOMServer.renderToString(
        <BlogDetailPage record={blog} {...props} />,
      ),
    );
  } else if (/^\/erfahrungsberichte\//.test(url)) {
    const broker = await new BrokerService(req).findByURL(
      url.replace(/^\/erfahrungsberichte\//g, ''),
    );
    return res.send(
      ReactDOMServer.renderToString(
        <BrokerViewPage record={broker} {...props} />,
      ),
    );
  } else {
    let category = await new CategoryService(req).findByURL(
      url,
    );
    let page = category
      ? null
      : await new PageService(req).findByURL(url);
    let brokerArticle =
      category || page
        ? null
        : await new BrokerArticleService(req).findByURL(
            url,
          );
    if (category || page || brokerArticle) {
      return res.send(
        ReactDOMServer.renderToString(
          <GeneralPage
            category={category}
            page={page}
            brokerArticle={brokerArticle}
            {...props}
          />,
        ),
      );
    }
  }

  return false;
};
