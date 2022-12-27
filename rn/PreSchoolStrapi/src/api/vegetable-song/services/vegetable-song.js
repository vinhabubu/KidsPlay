'use strict';

/**
 * vegetable-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vegetable-song.vegetable-song');
