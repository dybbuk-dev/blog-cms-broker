import { HtmlViewWrapper } from 'src/view/shared/view/HtmlView';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumb from 'src/view/home/Breadcrumb';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import Layout from 'src/view/home/Layout';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Spinner from 'src/view/shared/Spinner';
import authorHomeSelectors from 'src/modules/author/home/authorHomeSelectors';
import authorHomeActions from 'src/modules/author/home/authorHomeActions';
import AuthorView from 'src/view/shared/view/AuthorView';
import MDBox from 'src/mui/components/MDBox';

const ComparisonPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    categoryHomeSelectors.selectLoading,
  );
  const category = useSelector(
    categoryHomeSelectors.selectRecord,
  );

  const authorLoading = useSelector(
    authorHomeSelectors.selectLoading,
  );
  const author = useSelector(
    authorHomeSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(categoryHomeActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  return (
    <Layout
      title={`Broker Vergleich ${moment().year()} » 100% unabhängiger Test`}
      keywords={[
        'broker bewertung',
        'broker erfahrungen',
        'broker bewertungen',
      ]}
      description={`100% unabhängiger Broker Vergleich ✚✚ Über ${
        category?.count ?? 0
      } Broker Vergleich im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`}
    >
      <MDBox display="flex" flexDirection="column" gap={2}>
        {loading && <Spinner />}
        {dispatched && !loading && category && (
          <PageContent>
            <Breadcrumb
              items={[
                {
                  name: 'Online Broker Vergleich',
                  route: '/broker-vergleich',
                },
              ]}
            />
            <MDTypography variant="h1" pb={2}>
              Broker Vergleich
            </MDTypography>
            <HtmlViewWrapper>
              <p>
                {i18n(
                  'entities.broker.text.broker_comparison_teaser',
                )}
              </p>
            </HtmlViewWrapper>
            <MDTypography
              display="block"
              variant="h3"
              my={2}
            >
              {i18n('entities.home.top_brokers')}
            </MDTypography>
            <TopBrokersView />
            <BrokerListTable category={0} />
            <HtmlViewWrapper>
              <h2>
                Broker Vergleich - die wichtigsten
                Brokertypen im Überblick
              </h2>

              <p>
                Bevor Sie sich dafür entscheiden,
                beispielsweise Aktien, Fonds, Devisen, CFDs
                oder Optionen sowie Futures online zu
                handeln, sollten Sie die am Markt präsenten
                Broker miteinander vergleichen. Da es
                unterschiedliche Brokertypen gibt, ist es
                wichtig, dass Sie zumindest die groben
                Unterschiede zwischen den Anbietertypen
                kennen, um sich für den Broker zu
                entscheiden, der für Sie das passende
                Angebot machen kann.
              </p>

              <p>
                <u>
                  <strong>Inhalt:</strong>
                </u>
              </p>

              <ol>
                <li>
                  <a href="#Brokertypen">
                    Welche Brokertypen gibt es ?
                  </a>
                </li>
                <li>
                  <a href="#Online Broker">Online Broker</a>
                </li>
                <li>
                  <a href="#Forex Broker">Forex Broker</a>
                </li>
                <li>
                  <a href="#CFD Broker">CFD Broker</a>
                </li>
                <li>
                  <a href="#Futures Broker">
                    Futures Broker
                  </a>
                </li>
                <li>
                  <a href="#Social Trading Broker">
                    Social Trading Broker
                  </a>
                </li>
                <li>
                  <a href="#Fazit">Fazit</a>
                </li>
              </ol>

              <h3>
                <a></a>
                Welche Brokertypen gibt es?
              </h3>

              <p>
                Die am Markt vorhandenen Broker lassen sich
                insbesondere danach unterscheiden, welches
                Handelsangebot sie unterbreiten. So können
                Sie beispielsweise bei dem einen Broker nur
                Aktien, Fonds und Anleihen handeln, während
                der andere Broker speziell den
                Devisenhandel, das sogenannte Forex Trading,
                zur Verfügung stellt.
                <br />
                <br />
                <u>
                  <strong>
                    In der Übersicht ins sind es
                    insbesondere die folgenden Brokertypen,
                    die derzeit ihr Angebot unterbreiten:
                  </strong>
                </u>
              </p>

              <ul>
                <li>Online-Broker</li>
                <li>
                  <a href="https://broker-bewertungen.de/forex-broker-vergleich">
                    Forex-Broker
                  </a>
                </li>
                <li>
                  <a href="https://broker-bewertungen.de/cfd-broker-vergleich">
                    CFD-Broker
                  </a>
                </li>
                <li>
                  <a href="https://broker-bewertungen.de/futures-broker-vergleich">
                    Futures-Broker
                  </a>
                </li>
                <li>
                  <a href="https://broker-bewertungen.de/social-trading-broker-vergleich">
                    Social-Trading-Broker
                  </a>
                </li>
              </ul>

              <div>
                Zu diesen Brokern möchten wir im Folgenden
                kurz eine Definition geben, damit Sie
                wissen, welche Art von Anbieter Sie bei
                Ihrem persönlichen Broker Vergleich
                berücksichtigen sollten.
                <h3>
                  <a></a>
                  Online-Broker: Handel mit Aktien, Fonds
                  und anderen Wertpapieren
                </h3>
                Der Begriff Online-Broker ist ziemlich
                global, denn im Grunde sind sämtliche Broker
                ohnehin ausschließlich über das Internet
                tätig. Für gewöhnlich ist mit der
                Bezeichnung Online-Broker allerdings
                gemeint, dass es sich dabei um sogenannte
                Aktien- oder Wertpapierbroker handelt. Dies
                bedeutet, dass Online-Broker insbesondere
                den Handel mit den folgenden
                Finanzinstrumenten offerieren:
              </div>

              <ul>
                <li>Aktien</li>
                <li>Anleihen</li>
                <li>ETFs</li>
              </ul>

              <div>
                Mitunter haben Online-Broker ihr Angebot
                mittlerweile auch etwas erweitert und bieten
                zudem den Handel mit CFDs und einigen
                Derivaten an.
                <h3>
                  <a></a>
                  Forex-Broker: Handel mit Devisen
                </h3>
                Falls Sie mit Devisen handeln möchten,
                sollten Sie beim Broker Vergleich
                insbesondere ein Auge auf die am Markt
                auftretenden Forex-Broker werfen. Die
                sogenannten Devisenbroker stellen die
                Handelsplattform zur Verfügung, damit Sie
                darüber fremde Währungen handeln können. Der
                Devisenhandel wird in der Fachsprache als
                Forex Trading bezeichnet und Sie benötigen
                ein Handelskonto bei einem speziellen
                Broker, der auch unter der Bezeichnung
                Forex-Broker am Markt auftritt.
                <br />
                <br />
                <u>
                  <strong>
                    Beim Broker Vergleich sollten Sie in
                    dieser Rubrik unter anderem auf die
                    folgenden Punkte achten:
                  </strong>
                </u>
              </div>

              <ol>
                <li>
                  Wie viele Währungspaare können gehandelt
                  werden?
                </li>
                <li>Ist der mobile Handel möglich?</li>
                <li>
                  Wie gestalten sich die Konditionen (
                  <a href="https://broker-bewertungen.de/blog/forex-trading-kosten-spreads-gebuehren-zinsen">
                    Spread
                  </a>
                  )?
                </li>
                <li>Gibt es ein kostenfreies Demokonto?</li>
                <li>
                  Wie funktional ist die Handelsplattform?
                </li>
              </ol>

              <div>
                <h3>
                  <a></a>
                  CFD-Broker: Handel mit Differenzkontrakten
                </h3>
                Ein Brokertyp, der sich in den letzten
                Jahren einer zunehmenden Beliebtheit
                erfreut, ist der CFD-Broker. Es handelt sich
                dabei um Broker, die den Handel mit den
                sogenannten Differenzkontrakten zur
                Verfügung stellen. Das CFD-Trading hat in
                den vergangenen Jahren deutlich an
                Beliebtheit gewonnen, spätestens, seitdem
                der Handel mit binären Optionen innerhalb
                der EU nicht mehr erlaubt ist. CFD-Broker
                funktionieren ganz ähnlich wie Forex-Broker,
                nur dass eben nicht der Handel von Devisen
                im Vordergrund steht, auch wenn zahlreiche
                CFD-Broker ebenfalls im Bereich Forex
                Trading aktiv sind. Im Zentrum steht jedoch
                der Handel mit CFDs, wobei mittlerweile
                nahezu alle CFD-Broker die folgenden
                Basiswerte offerieren:
              </div>

              <ul>
                <li>Indizes</li>
                <li>Aktien</li>
                <li>Rohstoffe</li>
                <li>Devisen</li>
              </ul>

              <div>
                Manche CFD-Broker bieten zudem
                Differenzkontrakte mit Kryptowährungen als
                Basiswerte an.
                <h3>
                  <a></a>
                  Futures-Broker: Handel mit
                  Terminkontrakten
                </h3>
                Sehr spezielle Broker sind die sogenannten
                Futures-Broker. Diese stellen eine
                Handelsplattform zur Verfügung, die eine
                Anbindung an die Terminbörsen hat. Die
                Futures-Broker werden ihrem Namen gerecht,
                denn sie bieten meistens ausschließlich den
                Handel mit Futures an. Mitunter können
                zusätzlich auch Optionen gehandelt werden,
                sodass dieser Aspekt beim Broker Vergleich
                vielleicht auch für Sie wichtig ist.
                <h3>
                  <a></a>
                  Social-Trading-Broker: Handeln in der
                  Community
                </h3>
                Streng genommen handelt es sich bei
                Social-Trading-Brokern nicht um spezielle
                Brokertypen, zumindest nicht in dem Sinne,
                als dass bestimmte Finanzprodukte zum Handel
                angeboten werden. So gibt es zum Beispiel im
                Bereich der Forex- und CFD-Broker einige
                Anbieter, die sich ebenso als
                Social-Trading-Broker bezeichnen.
                Kennzeichnend für diesen Brokertyp ist vor
                allem, dass das Social-Trading angeboten
                wird. Dies beinhaltet oftmals, dass Trader
                in der Community handeln, Aufträge von
                professionellen Tradern kopieren und sich
                untereinander austauschen können. Das
                Social-Trading soll insbesondere dazu
                dienen, dass Anfänger weniger Fehler machen
                und von den Erfahrungen der Experten lernen.
                <h3>
                  <a></a>Fazit
                </h3>
                Zusammenfassend lässt sich festhalten, dass
                es am Markt ganz unterschiedliche
                Brokertypen gibt. Daher sollten Sie zunächst
                auf Basis Ihrer Handelsaktivitäten
                festlegen, welche Art von Broker für Sie das
                passende Angebot bereithält. Anschließend
                können Sie dann in dieser Rubrik einen
                umfassenden Broker Vergleich durchführen, um
                den günstigsten oder besten Broker zu
                finden.
              </div>
            </HtmlViewWrapper>
          </PageContent>
        )}
        {dispatched && !authorLoading && author && (
          <AuthorView value={author} />
        )}
      </MDBox>
    </Layout>
  );
};

export default ComparisonPage;
