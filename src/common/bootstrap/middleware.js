/**
 * this file will be loaded before server started
 * you can register middleware
 * https://thinkjs.org/doc/middleware.html
 */

import responseMiddleware from 'think-response-time';

think.middleware('response-time', responseMiddleware({
  digits: 5,
  suffix: true,
  header: 'X-Response-Time'
}));

/**
 * 
 * think.middleware('xxx', http => {
 *   
 * })
 * 
 */
