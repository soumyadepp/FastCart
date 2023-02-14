import styles from './RatingChip.module.css';


type RatingChipPropType = {
    rating: number | undefined;
}

export default function RatingChip(props: RatingChipPropType) {

    const { rating: productRating } = props;
    const renderRating = () => {
        if(productRating)
            return (productRating).toPrecision(2);
        return "-";
    }
    const getMappedClassFromRating = (): string => {
        if (productRating === undefined) return styles.none;
        if (productRating >= 0 && productRating < 3) return styles.red;
        if (productRating >= 3 && productRating < 4) return styles.darkGreen;
        return styles.lightGreen;
    }

    return (
        <div className={getMappedClassFromRating()}>
            <p>{renderRating()} / 5</p>
        </div>
    )
}
