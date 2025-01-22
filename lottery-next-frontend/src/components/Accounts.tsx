import type { BigNumber } from "@ethersproject/bignumber";
import type { Web3ReactHooks } from "@web3-react/core";
import { formatEther } from "ethers";
import { useEffect, useState } from "react";

const useBalances = (
  provider?: ReturnType<Web3ReactHooks["useProvider"]>,
  accounts?: string[]
): [BigNumber[] | undefined, boolean] => {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();
  const [loadingBal, setloadingBal] = useState(true);

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;
      setloadingBal(true);

      Promise.all(accounts.map((account) => provider.getBalance(account))).then(
        (balances) => {
          if (stale) return;
          setBalances(balances);
          setloadingBal(false);
        }
      );

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return [balances, loadingBal];
};

export const Accounts = ({
  accounts,
  provider,
}: {
  accounts: ReturnType<Web3ReactHooks["useAccounts"]>;
  provider: ReturnType<Web3ReactHooks["useProvider"]>;
}) => {
  const [balances, loading] = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{" "}
      <b>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <ol
                key={account}
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <li>
                  {account}
                  {loading && "loadin"}
                  {balances?.[i] && !loading
                    ? ` (Ξ${parseFloat(
                        // @ts-ignore
                        formatEther(BigInt(balances[i]))
                      ).toFixed(4)})`
                    : null}
                </li>
              </ol>
            ))}
      </b>
    </div>
  );
};
