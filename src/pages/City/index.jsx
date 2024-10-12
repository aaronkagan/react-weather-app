import React from 'react';

export default function City({ match }) {
  return <div>{match.params.cityId}</div>;
}
