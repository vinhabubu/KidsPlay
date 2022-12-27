'use strict';

/**
 * animal-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::animal-song.animal-song');
