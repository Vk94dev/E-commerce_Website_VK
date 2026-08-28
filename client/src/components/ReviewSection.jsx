import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
} from "../api/api";

const ReviewSection = ({ productId }) => {

    const user = useSelector((state) => state.auth.user);

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const [averageRating, setAverageRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);


    // =========================
    // GET REVIEWS
    // =========================

    const fetchReviews = async () => {

        try {

            const data = await getProductReviews(productId);

            setReviews(data.reviews || []);
            setAverageRating(data.rating || 0);
            setNumReviews(data.totalReviews || 0);

        } catch (error) {

            console.log(error);

        }

    };
   
useEffect(()=>{
    fetchReviews();
}, [productId]);



    const currentUserId =
        user?.user?._id || user?._id;

    const myReview = reviews.find(
        (review) =>
            review.user?.toString() === currentUserId?.toString()
    );


    // =========================
    // SUBMIT REVIEW
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!comment.trim()) {
            alert("Please enter a comment");
            return;
        }

        try {

            setLoading(true);

            let data;

            if (editing) {

                data = await updateReview(
                    productId,
                    {
                        rating,
                        comment
                    }
                );

            } else {

                data = await addReview(
                    productId,
                    {
                        rating,
                        comment
                    }
                );

            }

            console.log(data);

            setComment("");
            setRating(0);
            setEditing(false);

            await fetchReviews();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = () => {

        if (!myReview) return;

        setRating(myReview.rating);
        setComment(myReview.comment);
        setEditing(true);

    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async () => {

        if (!window.confirm("Delete your review?")) {
            return;
        }

        try {

            await deleteReview(productId);

            await fetchReviews();

        } catch (error) {

            console.log(error);

        }

    };


    // =========================
    // STAR COMPONENT
    // =========================

    const Stars = ({ value, clickable = false }) => {

        return (

            <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                    <button
                        key={star}
                        type="button"
                        disabled={!clickable}
                        onClick={() => {
                            if (clickable) {
                                setRating(star);
                            }
                        }}
                        className="text-yellow-400"
                    >

                        {star <= value
                            ? <FaStar size={22} />
                            : <FaRegStar size={22} />
                        }

                    </button>

                ))}

            </div>

        );

    };


    return (

        <section className="mt-3 ">

            <div className="border-t pt-3 ">

                {/* ======================
                    SUMMARY
                ====================== */}

                <div className="mb-8 ">

                    <h2 className="text-xl font-semibold mb-3">
                        Customer Reviews
                    </h2>

                    <div className="flex items-center gap-3">

                        <span className="text-3xl font-bold">
                            {Number(averageRating).toFixed(1)}
                        </span>

                        <Stars value={Math.round(averageRating)} />

                        <span className="text-gray-500">
                            ({numReviews} reviews)
                        </span>

                    </div>

                </div>


                {/* ======================
                    ADD / UPDATE REVIEW
                ====================== */}

                {/* {user && !myReview && !editing && (

                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl mb-8 hidden "
                    >

                        <h3 className="text-xl font-semibold mb-4">
                            Write a Review
                        </h3>

                        <Stars
                            value={rating}
                            clickable={true}
                        />

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Write your review..."
                            className="w-full mt-4 p-3 border rounded-lg"
                            rows="4"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Review"}
                        </button>

                    </form>

                )}
 */}

                {/* ======================
                    EDIT REVIEW
                ====================== */}

                {/* {editing && (

                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl mb-8 "
                    >

                        <h3 className="text-xl font-semibold mb-4">
                            Update Review
                        </h3>

                        <Stars
                            value={rating}
                            clickable={true}
                        />

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            className="w-full mt-4 p-3 border rounded-lg"
                            rows="4"
                        />

                        <div className="flex gap-3 mt-4">

                            <button
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Update
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setEditing(false);
                                    setComment("");
                                }}
                                className="px-5 py-2 bg-gray-500 text-white rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )} */}
                

            </div>

        </section>

    );

};

export default ReviewSection;





