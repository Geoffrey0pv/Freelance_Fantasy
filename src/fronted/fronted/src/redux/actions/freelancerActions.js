import {
  FREELANCERS_LIST_REQUEST,
  FREELANCERS_LIST_SUCCESS,
  FREELANCERS_LIST_FAIL,
} from "../../constants/freelancerConstants";
import {
  getAllFreelancersService,
  getPublicImageService,
  getPublicReviewService,
} from "../../service/freelancerService";

export const listFreelancers = (pageNumber = 1) => async (dispatch) => {
  try {
    dispatch({ type: FREELANCERS_LIST_REQUEST });

    // Obtener freelancers para la página actual
    const { freelancers, pages, page } = await getAllFreelancersService(pageNumber);

    const detailedFreelancers = await Promise.all(
      freelancers.map(async (freelancer) => {
        const [imageData, reviews] = await Promise.all([
          getPublicImageService(freelancer.id),
          getPublicReviewService(freelancer.id),
        ]);

        const averageRating = reviews.length
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;

        return {
          ...freelancer,
          profile_image: imageData?.profile_image || "",
          rating: averageRating,
        };
      })
    );

    dispatch({
      type: FREELANCERS_LIST_SUCCESS,
      payload: { freelancers: detailedFreelancers, pages, page },
    });
  } catch (error) {
    dispatch({
      type: FREELANCERS_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
