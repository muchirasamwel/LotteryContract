import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";

import { Accounts } from "./Accounts";
import { Status } from "./Status";
import { Dispatch, SetStateAction } from "react";
import ConnectDisconnect from "./ConnectDisconnect";

interface Props {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: Dispatch<SetStateAction<undefined>>;
  provider?: ReturnType<Web3ReactHooks["useProvider"]>;
  accounts?: string[];
}

export const Card = ({
  connector,
  activeChainId,
  isActivating,
  isActive,
  error,
  setError,
  accounts,
  provider,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "20rem",
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        border: "1px solid",
        borderRadius: "1rem",
      }}
    >
      <b>{"MetaMask"}</b>
      <div style={{ marginBottom: "1rem" }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <div>
        Chain Id: <b>{activeChainId ?? null}</b>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <Accounts accounts={accounts} provider={provider} />
      </div>
      <ConnectDisconnect
        connector={connector}
        activeChainId={activeChainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
};
