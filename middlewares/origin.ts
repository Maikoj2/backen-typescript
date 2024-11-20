import { NextFunction, Request, Response } from 'express';
import { parse } from 'psl';
import { CustomRequest } from '../models';

const getExpeditiousCache = require('express-expeditious');
const redisEngine = require('expeditious-engine-redis');


let cache: any= null;


const parseDomain = (data: RegExpExecArray) => {    
    try {
        return data[1]
    } catch (error) {
        console.log('Error parsing domain', error);
        return null;

    }
}

const checkDomain = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const origin = req.get('origin');
        
        const re = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/ig; // regular expression
        if (!origin) throw new Error('the origin must be specified')
        const result = re.exec(origin);
        const rawDomain = result ? parseDomain(result) : null;
        const clean = rawDomain ? parse(rawDomain) : null;

        (clean && 'subdomain' in clean) ?
            req.clientAccount = clean.subdomain || null : req.clientAccount = null;
            // console.log(req.clientAccount);
        next();
    } catch (error) {
        console.log('Error clientAccount', error);
        req.clientAccount = null;
        next();

    }
}

const checkTenant = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (process.env.USE_REDIS ===  'true') {
            if (!cache) {
                 cache = getExpeditiousCache({
                    namespace: req.clientAccount,
                    defaultTld: '5 Minutes',
                    sessionAware: false,
                    engine: redisEngine({
                        host: process.env.REDIS_HOST,
                        port: process.env.REDIS_PORT
                    })
                })
                cache.withNamespace(req.clientAccount)
                .withTtlForStatus('1 minute', 404)
            }

            
        }
        next()
    } catch (error) {
        console.log('Error while checking tenant');
        next()
    }

}


export default {
    checkDomain,
    checkTenant
}