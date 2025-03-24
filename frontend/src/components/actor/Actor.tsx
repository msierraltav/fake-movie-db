import { Actor as ActorType } from '../../hooks/useMovieActors';
import './actor.scss';

interface ActorProps {
  actor: ActorType;
}

function Actor({ actor }: ActorProps) {
  return (
    <div className="actor-card">
      <h4>{actor.primaryName}</h4>
      <div className="actor-info">
        {actor.birthYear && (
          <span className="actor-year">
            {actor.birthYear}{actor.deathYear ? ` - ${actor.deathYear}` : ''}
          </span>
        )}
        
        {actor.primaryProfession && (
          <div className="professions">
            {actor.primaryProfession.split(',').map((profession, index) => (
              <span key={index} className="profession-tag">{profession.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Actor;
