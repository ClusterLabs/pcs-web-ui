import {Form, FormFieldGroup, Text, TextContent} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  FormRadios,
  FormSelect,
  FormText,
  TaskLibStep,
  help as helpAll,
} from "app/view/share";

import {useTask} from "./useTask";

const {options, compression, crypto} =
  testMarks.task.clusterSetup.advancedOptions.transport;
const help = helpAll.knet;

const ID_PREFIX_OPTIONS = "cluster-setup-transport-options";
const ID_PREFIX_COMPRESSION = "cluster-setup-compression";
const ID_PREFIX_CRYPTO = "cluster-setup-crypto";
export const TransportOptions = () => {
  const {
    allReports,
    updateTransportOptions,
    updateCompressionOptions,
    updateCryptoOptions,
    state: {transportOptions, compressionOptions, cryptoOptions},
  } = useTask();
  return (
    <TaskLibStep title="Transport options" reports={allReports}>
      <Form>
        <TextContent>
          <Text component="h3">Knet options</Text>
        </TextContent>
        <FormFieldGroup {...options.mark}>
          <FormSelect
            label="Ip version"
            id={`${ID_PREFIX_OPTIONS}-ip_version`}
            popover={help.options.ip_version}
            optionsValues={["ipv4", "ipv6", "ipv4-6", "ipv6-4", "default"]}
            selections={transportOptions.ip_version}
            onSelect={value =>
              updateTransportOptions({
                ip_version: value.toString() as NonNullable<
                  typeof transportOptions.ip_version
                >,
              })
            }
            {...options.ip_version.mark}
          />

          <FormText
            label="PMTUd Interval"
            id={`${ID_PREFIX_OPTIONS}-pmtud-interval`}
            popover={help.options.knet_pmtud_interval}
            value={transportOptions.knet_pmtud_interval}
            onChange={value =>
              updateTransportOptions({knet_pmtud_interval: value})
            }
            {...options.knet_pmtud_interval.mark}
          />

          <FormSelect
            label="Link mode"
            id={`${ID_PREFIX_OPTIONS}-link_mode`}
            popover={help.options.link_mode}
            optionsValues={["active", "passive", "rr", "default"]}
            selections={transportOptions.link_mode}
            onSelect={value =>
              updateTransportOptions({
                link_mode: value.toString() as NonNullable<
                  typeof transportOptions.link_mode
                >,
              })
            }
            {...options.link_mode.mark}
          />
        </FormFieldGroup>

        <TextContent>
          <Text component="h3">Compression</Text>
        </TextContent>
        <FormFieldGroup {...compression.mark}>
          <FormText
            label="Model"
            id={`${ID_PREFIX_COMPRESSION}-model`}
            popover={help.compression.model}
            value={compressionOptions.model}
            onChange={value => updateCompressionOptions({model: value})}
            {...compression.model.mark}
          />

          <FormText
            label="Threshold"
            id={`${ID_PREFIX_COMPRESSION}-threshold`}
            popover={help.compression.threshold}
            value={compressionOptions.threshold}
            onChange={value => updateCompressionOptions({threshold: value})}
            {...compression.threshold.mark}
          />

          <FormText
            label="Level"
            id={`${ID_PREFIX_COMPRESSION}-level`}
            popover={help.compression.level}
            value={compressionOptions.level}
            onChange={value => updateCompressionOptions({level: value})}
            {...compression.level.mark}
          />
        </FormFieldGroup>
        <TextContent>
          <Text component="h3">Crypto</Text>
        </TextContent>
        <FormFieldGroup {...crypto.mark}>
          <FormRadios
            label="Model"
            id={`${ID_PREFIX_CRYPTO}-model`}
            popover={help.crypto.model}
            options={["nss", "openssl", "default"]}
            selected={cryptoOptions.model}
            onChange={value => updateCryptoOptions({model: value})}
            {...crypto.model.mark}
          />

          <FormSelect
            label="Hash"
            id={`${ID_PREFIX_CRYPTO}-hash`}
            popover={help.crypto.hash}
            optionsValues={[
              "none",
              "md5",
              "sha1",
              "sha256",
              "sha384",
              "sha512",
              "default",
            ]}
            selections={cryptoOptions.hash}
            onSelect={value =>
              updateCryptoOptions({
                hash: value.toString() as NonNullable<
                  typeof cryptoOptions.hash
                >,
              })
            }
            {...crypto.hash.mark}
          />

          <FormSelect
            label="Cipher"
            id={`${ID_PREFIX_CRYPTO}-cipher`}
            popover={help.crypto.cipher}
            optionsValues={["none", "aes256", "aes192", "aes128", "default"]}
            selections={cryptoOptions.cipher}
            onSelect={value =>
              updateCryptoOptions({
                cipher: value.toString() as NonNullable<
                  typeof cryptoOptions.cipher
                >,
              })
            }
            {...crypto.cipher.mark}
          />
        </FormFieldGroup>
      </Form>
    </TaskLibStep>
  );
};
