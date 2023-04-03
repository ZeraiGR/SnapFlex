import { RepeatedCount } from 'src/card/types';

export const updateRepeatedStatus = (currentStatus: RepeatedCount) => {
  switch (currentStatus) {
    case RepeatedCount.FIRST:
      return RepeatedCount.SECOND;
    case RepeatedCount.SECOND:
      return RepeatedCount.THIRD;
    case RepeatedCount.THIRD:
      return RepeatedCount.FOURTH;
    case RepeatedCount.FOURTH:
      return RepeatedCount.FIFTH;
    case RepeatedCount.FIFTH:
      return RepeatedCount.SIXTH;
    case RepeatedCount.SIXTH:
      return RepeatedCount.SEVENTH;
    case RepeatedCount.SEVENTH:
      return RepeatedCount.EIGHTH;
    default:
      return RepeatedCount.EIGHTH;
  }
};
