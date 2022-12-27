'use strict';

/**
 * fruit-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fruit-song.fruit-song');
