import { getGuEarthContributors } from '@/lib/github';
import type { GuEarthContributor } from '@/lib/github';

function isBot(contributor: GuEarthContributor) {
  return contributor.type === 'Bot' || contributor.login.endsWith('[bot]');
}

function AvatarList({ contributors }: { contributors: GuEarthContributor[] }) {
  return (
    <div className="community__avatars">
      {contributors.map((contributor) => (
        <a
          key={contributor.login}
          className="contributor"
          href={contributor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-login={contributor.login}
        >
          <img
            src={contributor.avatarUrl}
            alt={contributor.login}
            width={48}
            height={48}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </a>
      ))}
    </div>
  );
}

export async function Contributors() {
  const contributors = await getGuEarthContributors();
  if (contributors.length === 0) return null;

  const humans = contributors.filter((contributor) => !isBot(contributor));
  const bots = contributors.filter(isBot);
  if (humans.length === 0) return null;

  return (
    <section className="community">
      <span className="community__eyebrow">社区</span>
      <h2>由像你一样充满热情的开发者共同创造</h2>
      <p>感谢这些为咕咕地球开源社区做出贡献的开发者</p>
      <span className="community__count">共 {humans.length} 位贡献者</span>
      <AvatarList contributors={humans} />
      {bots.length > 0 && (
        <>
          <span className="community__count">非人类维护者</span>
          <AvatarList contributors={bots} />
        </>
      )}
    </section>
  );
}
