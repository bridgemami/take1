import Head from 'next/head';
//getAllIds is a function from lib/data.js
import { getAllIds, getDataCommon } from '../lib/data';
import Layout from '../components/layout';
import CharacterList from '../components/author';

//create an instance of the getStaticPaths() to report next all possible dynamic urls
export async function getStaticPaths() {
    const paths = getAllIds();
    return {
        paths,
        fallback: false,
    };
    }

//create an instance of the getStaticProps() to return data for one person
export async function getStaticProps({params}) {
    const itemData = await getDataCommon( params.id);
    return  {
        props: {
            itemData
        }
    }
}


// make a react component to display all details about a person when a dynamic route matches, like id 1 or id 2
export default function Character ({itemData}) {
    return (
        <Layout>
        <div className="card mx-auto card-class mt-4 p-0 border border-dark">
        <div className="row">
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold text-decoration-underline">{classData.author}</h2>
              <h5 className="my-3">Affiliation:</h5>
                {itemData.affiliation.map((affiliations) => (
                  <ul>
                    <li>
                      {affiliations}
                    </li>
                  </ul>
                ))}
                
                {itemData.related ? // if there are related classes, display this header 
                  <h5 className="my-3">Type:{classData.type}</h5> : null
                }

                {itemData.related ? // if there are related cids, generate a list of them
                  itemData.related.map(
                    ({id, author}) => (
                      <ul>
                        <li>
                          <Link key={id} href={`${id}`}>
                            <a>{author}</a>
                          </Link>
                      </li>
                      </ul>
                      
                    )
                  ) 
                  : null
                }
            </div>
          </div>
        </div>
      </div>
      
        </Layout>
    );
}