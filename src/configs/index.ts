import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

export const ServiceModes = Object.freeze({
	LOCAL: 'local',
	EXTERNAL: 'external',
	INTERNAL: 'internal',
})

export default Object.freeze(
	(() => {
		/** @type {Config} */
		let tmpConfig

		// centralizes Joi validation and analyzes the relevant subset of env vars only
		const validate = (/** @type {NodeJS.ProcessEnv} */ obj: any, /** @type {Joi.PartialSchemaMap<any>} */ schema: any) => {
			const { error, value: envVars } = Joi.object(schema).validate(
				Object.keys(obj).reduce((acc, key) => (schema[key] ? { ...acc, [key]: obj[key] } : acc), {}),
				{ abortEarly: false },
			)
			// We should probably create a special error class
			if (error) throw new Error('Invalid environment variables. ' + error)
			return envVars;
		}

		// Load main environment variables
		tmpConfig = validate(process.env, {
			SERVICE_MODE: Joi.string()
				.valid(...Object.values(ServiceModes))
				.required(),
            NODE_ENV: Joi.string().required(),
            SERVER_HOST: Joi.string().required(),
            SERVER_PORT: Joi.number().integer().min(1).max(65535).required(),
            /*
            // DB Configs
			DB_PORT: Joi.number().integer().min(1).max(65535).required(),
			DB_HOST: Joi.string().required(),
			DB_SCHEMA: Joi.string().required(),
			DB_USERNAME: Joi.string().required(),
			DB_PASSWORD: Joi.string().required(),
			DB_MIN_CONNECTION: Joi.number().integer().min(0).required(),
			DB_MAX_CONNECTION: Joi.number().integer().min(1).required(),
			// Redis configs
            REDIS_HOST: Joi.string().required(),
			REDIS_PORT: Joi.number().integer().min(1).max(65535).required(),
			NOREPLY_EMAIL: Joi.string().required(),
			TOKEN_EXPIRE_MINUTES: Joi.number().integer().min(1).required(),
			REFRESH_TOKEN_EXPIRE_MINUTES: Joi.number().integer().min(1).required(),
			RESET_PASSWORD_EXPIRE_DAYS: Joi.number().integer().min(1).required()
            */
		});
		return tmpConfig;
	})(),
);