import env from "../config/env.ts";
import api from "../lib/api.ts";
import logger from "../lib/logger.ts";
import { redis } from "./cache.ts";
import { transformCourse } from "./courseTransformar.ts";

export async function getCourseByIdInternal(courseId: number) {
  const key = `course:${courseId}`;

  const cachedCourse = await redis.get(key);
  if (cachedCourse) {
    logger.info("Returning course from cache");
    return JSON.parse(cachedCourse);
  }

  const response = await api.get(`/courses/${courseId}`);
  const course = response.data.data;

  const transformedCourse = transformCourse(course);

  await redis.set(
    key,
    JSON.stringify(transformedCourse),
    "EX",
    env.COURESES_CACHE_TIME,
  );

  return transformedCourse;
}
