import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const personMotherInList = people.some(
    personFromList => person.motherName === personFromList.name,
  );

  const personFatherInList = people.some(
    personFromList => person.fatherName === personFromList.name,
  );

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personMotherInList ? (
          <Link
            className={classNames({
              'has-text-danger': person.sex === 'f',
            })}
            to={`../${person.slug}`}
          >
            {person.motherName || '-'}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {personFatherInList ? (
          <Link to={`../${person.slug}`}>{person.fatherName || '-'}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
